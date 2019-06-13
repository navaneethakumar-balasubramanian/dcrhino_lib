# SAR Serial convertor
import math
import csv
import sys
pow_of_2 = pow(2,32)
volt_per_bit = 5.0/pow(2,31)

def conv_to_volt(val):
    # if the MSB is set, then
    cval = int(val)
    if cval & 0x80000000 == 0x80000000:
        cval = cval - pow_of_2
    conv_to_volt = round(cval/2,0) * volt_per_bit
    return conv_to_volt

def convert_line(ofile, ln):
    flds = ln.split(',')
    if len(flds) > 0:
        if flds[0] == 'data':
            # do the conversion here. Else ignore.
            xval = conv_to_volt(flds[3])
            yval = conv_to_volt(flds[4])
            ostr = str(xval)+','+str(yval)+'\r\n'
            ofile.write(ostr)

if __name__=="__main__":
    if len(sys.argv) == 3:
        fl = sys.argv[1]
        print ("Processing ",fl)
        ifl = open(fl,'r')
        lns = ifl.readlines()
        ofile = open(sys.argv[2],'w')
        for ln in lns:
            convert_line(ofile,ln)
        ofile.close()
    else:
        print("usage: sar_convert.py infile outfile")
            
