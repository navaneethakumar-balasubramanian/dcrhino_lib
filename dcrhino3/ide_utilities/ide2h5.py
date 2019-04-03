'''
Command-line utility to batch export IDE files as SEGY Intended for
small files.

Created on Jan 26, 2016

@author: dstokes

Modified by NRN on May 22, 2018
'''
from __future__ import absolute_import, division, print_function

import ConfigParser
import locale
import os.path
import sys
import time
from datetime import datetime
from sys import platform

import data_formats as df
import path_manager as pm
import rhino
from dcrhino3.ide_utilities.mide_ebml import importer


class IDEExportError(Exception):
    pass


def exportH5(events, serial_number, ideFileObj, resampling_rate, time_offset, **kwargs):
    """ Wrapper for H5 export
    """
    return events.exportH5(serial_number, ideFileObj, resampling_rate, time_offset=time_offset, **kwargs)



class SimpleUpdater(object):
    """ A simple text-based progress updater. Simplified version of the one in
        `mide_ebml.importer`
    """

    def __init__(self, cancelAt=1.0, quiet=False, out=sys.stdout, precision=0):
        """ Constructor.
            @keyword cancelAt: A percentage at which to abort the import. For
                testing purposes.
        """


        if platform == "linux" or platform == "linux2":
            locale.setlocale(locale.LC_ALL,'en_US.UTF-8')
        elif platform == "darwin":
            locale.setlocale(locale.LC_ALL,'en_US.UTF-8')
        elif platform == "win32":
            locale.setlocale(0,'English_United States.1252')

        self.out = out
        self.cancelAt = cancelAt
        self.quiet = quiet
        self.precision = precision
        self.reset()


    def reset(self):
        self.startTime = None
        self.cancelled = False
        self.estSum = None
        self.lastMsg = ''

        if self.precision == 0:
            self.formatter = " %d%%"
        else:
            self.formatter = " %%.%df%%%%" % self.precision

    def dump(self, s):
        if not self.quiet:
            self.out.write(s)
            self.out.flush()

    def __call__(self, count=0, total=None, percent=None, error=None,
                 starting=False, done=False, **kwargs):
        if starting:
            self.reset()
            return
        if percent >= self.cancelAt:
            self.cancelled=True
        if self.startTime is None:
            self.startTime = time.time()
        if done:
            self.dump(" Done.".ljust(len(self.lastMsg))+'\n')
            self.reset()
        else:
            if percent is not None:
                num = locale.format("%d", count, grouping=True)
                msg = "%s samples read" % num
                if msg != self.lastMsg:
                    self.lastMsg = msg
                    msg = "%s (%s)" % (msg, self.formatter % (percent*100))
                    dT = time.time() - self.startTime
                    if dT > 0:
                        sampSec = count/dT
                        msg = "%s - %s samples/sec." % (msg, locale.format("%d", sampSec, grouping=True))
                    self.dump(msg)
                    self.dump('\x08' * len(msg))
                    self.lastMsg = msg
                if percent >= self.cancelAt:
                    self.cancelled=True
            sys.stdout.flush()



def ideExport(ideFileObj,channels=None,resampling_rate=3200, time_offset=0, **kwargs):
    """ The main function that handles generating exported files from an IDE file.
    """
    updater = kwargs.get('updater', importer.nullUpdater)
    exporter = exportH5
    exportArgs = {}
    Rhino = rhino.RHINO()

    doc = importer.importFile(ideFileObj.AbsPath)
    sensor_serial_number = doc.recorderInfo["RecorderSerial"]

    if channels is None:
        exportChannels = doc.channels.values()
    else:
        exportChannels = [c for c in doc.channels.values() if c.id in map(int, channels)]

    numSamples = 0
    for ch in exportChannels:
       #Ch 8 = Main Acceleration
       #Ch 32 = MEMS Acceleration
       #Ch 59.0 = Pressure Data
        try:
            print("  Exporting Channel %d (%s) to %s..." % (ch.id, ch.name, "H5 file"))
            events = ch.getSession()#This gets a session that already exists, so it won't change the noBivariates flag at all
            numSamples += exporter(events, sensor_serial_number, ideFileObj, resampling_rate, time_offset=time_offset,
                                   callback=updater, **exportArgs)[0]
        except None:
            pass
    doc.close()
    return numSamples, Rhino


if __name__ == "__main__":
    import argparse

    argparser = argparse.ArgumentParser(description="IDE to H5 Converter v%d.%d.%d - Copyright (c) 2019 DataCloud")
#     argparser.add_argument('-c', '--channel', action='append', type=int,
#                            help="Export the specific channel. Can be used multiple times. If not used, all channels will export.")
#     argparser.add_argument('-b', '--bvr', choices=('True', 'False'), help="Remove Bivariate references", default='True')
#    argparser.add_argument('-l', '--trace_length', help="Trace Length", default='1')
    # argparser.add_argument('-s', '--sample_rate', help="Expected Sample Rate", default = '3200')
    argparser.add_argument('-p', '--path', help="Path for the input files", default='~/Downloads')
    argparser.add_argument('-TO', '--time_offset', help="Time Offset for clock differences", default=0)
    args = argparser.parse_args()

    # channel_list = args.channel
    channel_list = [8]
    time_offset = args.time_offset
    # if args.bvr == 'True':
    noBvr = True
    # else:
    #     noBvr = False

    if os.path.exists(args.path):
        path = args.path
    else:
        print("Input path does not exist.  Try a different path")
        sys.exit(0)

    sourceFiles = []
    if os.path.isdir(path):
        for root, dirs, files in os.walk(path, topdown=True):
            for name in files:
                if name[-4:] == ".IDE":
                    sourceFiles.append(os.path.join(root, name))
    else:
        sourceFiles.append(path)
        path = os.path.dirname(path)

    df.initBivariates(noBvr)
    try:
        totalSamples = 0
        t0 = datetime.now()
        updater = SimpleUpdater()
        for f in sourceFiles:
            config_name = f.replace(".IDE", ".cfg")
            config = ConfigParser.ConfigParser()
            config.read(config_name)
            resampling_rate = config.getint("COLLECTION", "output_sampling_rate")
            source_file = pm.FileObject(f)
            print ('Converting "%s"...' % f)
            updater.precision = max(0, min(2, (len(str(os.path.getsize(os.path.join(path,f))))/2)-1))
            updater(starting=True)
            numSamples, file_Rhino = ideExport(source_file,
                                      channels=channel_list,
                                      resampling_rate=resampling_rate,
                                      time_offset=time_offset,
                                      updater=updater)
            totalSamples += numSamples

        totalTime = datetime.now() - t0
        tstr = str(totalTime).rstrip('0.')
        sampSec = locale.format("%d", totalSamples/totalTime.total_seconds(), grouping=True)
        totSamp = locale.format("%d", totalSamples, grouping=True)
        print ("Conversion complete! Exported %s samples in %s (%s samples/sec.)" % (totSamp, tstr, sampSec))
        sys.exit(0)
    except IDEExportError as err:
        print ("*** Export error: %s") % err
        sys.exit(1)
    except KeyboardInterrupt:
        print ("\n*** Conversion canceled! Export of %s may be incomplete." % f)
        sys.exit(0)
    except None as err: #Exception as err:
        print ("*** An unexpected %s occurred. Is source an IDE file?" % err.__class__.__name__)
        print ("*** Message: %s" % err.message)
        sys.exit(1)
