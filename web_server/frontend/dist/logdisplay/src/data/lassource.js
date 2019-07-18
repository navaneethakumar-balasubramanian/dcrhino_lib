/**
 * Created by dmitriy on 7/18/2014.
 */
define(['geotoolkit.data', 'geotoolkit.welllog.las'], function () {
    function querySectionByName (sections, name) {
        for (var i = 0; i < sections.length; ++i) {
            if (sections[i].getName().toLowerCase().indexOf(name.toLowerCase()) >= 0) {
                return sections[i];
            }
        }
        return null;
    }

    function queryDataByKey (data, key) {
        for (var i = 0; i < data.length; ++i) {
            if (data[i].getMnemonic().toLowerCase() === key.toLowerCase()) {
                return data[i];
            }
        }
        return null;
    }

    /**
     * Open data source
     * @param {string} file file
     * @returns {geotoolkit.util.Promise}
     */
    var open = function (file) {
        var lineReader = new geotoolkit.util.stream.LineReader({
            'stream': new geotoolkit.util.stream.BrowserFileStream({
                'file': file
            })
        });

        var promise = new geotoolkit.util.Promise(function (resolve, reject) {
            geotoolkit.welllog.data.las.Las20Stream.isLAS20(lineReader)
                .then(
                    function (result) {
                        if (result['isLAS20'] === true) {
                            streamParse(lineReader, resolve, reject);
                        } else {
                            legacyParse(file, resolve, reject);
                        }
                    }, function (result) {
                        // console.log(result['details']);
                        legacyParse(file, resolve, reject);
                    });
        }
        );

        function streamParse (lineReader, resolve, reject) {
            new geotoolkit.welllog.data.las.Las20Stream({
                'reader': lineReader
            }).open(true).then(function (stream) {
                loadTable(stream, resolve, reject);
            }, function (err) {
                //console.log(err);
                reject(err);
            });
        }

        function legacyParse (file, resolve, reject) {
            var reader = new FileReader();
            // load data
            reader.onload = function (e) {
                // Parse loaded data
                var parser = geotoolkit.welllog.data.las.LasParser.getParserInstance(e.target.result);
                loadTable(parser, resolve, reject);
            };
            reader.readAsText(file);
        }

        function loadTable (parser, resolve, reject) {
            var table = new geotoolkit.data.DataTable();
            var wellSection = querySectionByName(parser.getSections(), 'WELL');
            var minIndex = parseFloat(queryDataByKey(wellSection.getData(), 'STRT').getValue());
            var maxIndex = parseFloat(queryDataByKey(wellSection.getData(), 'STOP').getValue());
            var sections = parser.getSectionGroups();
            var curveSection = querySectionByName(sections, 'LAS2');
            if (curveSection == null) {
                curveSection = querySectionByName(sections, 'Main Section');
            }
            if (curveSection != null) {
                var curveNames = curveSection.getCurveMnemonics();
                for (var i = 0; i < curveNames.length; ++i) {
                    var data = curveSection.getCurveData(i);
                    var info = curveSection.getCurveInfo(i);
                    var curve = new geotoolkit.data.NumericalDataSeries({
                        'name': info.getMnemonic(),
                        'data': data,
                        'id': info.getMnemonic(),
                        'unit': info.getUnit()
                    });
                    table.addColumn(curve);
                }
                table.setMetaData({
                    range: new geotoolkit.util.Range(minIndex, maxIndex),
                    index: table.getColumnByName('DEPTH') != null || curveNames.length === 0 ? 'DEPTH' : table.getColumn(0).getName()
                });
                resolve(table);
            } else {
                reject(table);
            }
        }

        return promise;
    };
    /**
     *
     * @param {geotoolkit.data.DataTable} table talbe to save
     * @param {string} file file name
     */
    var save = function (table, file) {
        var stream = new geotoolkit.util.stream.StringStream();
        stream.setSaveOptions({
            'type': 'text\/plain',
            'popupBlockedMessage': 'Popup-blocker blocked export window.'
        });
        var metaData = table.getMetaData();
        var indexColumn = metaData['index'] ? table.getColumnByName(metaData['index']) : table.getColumn(0);
        var lasWriter = new geotoolkit.welllog.data.las.Las20Writer(indexColumn);
        for (var i = 0; i < table.getNumberOfColumns(); i++) {
            lasWriter.addCurve(table.getColumn(i));
        }
        lasWriter.addCurveComment(0, 'Comment string');
        lasWriter.addCurveComment(5, 'Comment string 5');
        lasWriter.addCurveComment(-5, 'Comment string -5');
        lasWriter.addParameter('SomeParam', 'CM', 'VALUE VALUEaaa', 'DESCRIPTION');
        lasWriter.save(stream);
        stream.close();
        stream.save(file, true);
    };

    return {
        'open': open,
        'save': save
    };
});
