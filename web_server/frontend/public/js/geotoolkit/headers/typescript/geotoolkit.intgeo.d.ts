declare module geotoolkit {
    module intgeo {
        /**
         * A connector for INTGeoServer 'Pillar' faults
         */
        class RemoteFaultPillarDataSource {
            /**
             * A connector for INTGeoServer 'Pillar' faults
             * @param options  (Required) The options
             * @param options.server  (Required) The server url
             * @param options.metaservice  (Optional) The metadata service name
             * @param options.dataservice  (Optional) The data service name
             * @param options.file  (Optional) The file path
             */
            constructor(options: any | { server?: any; metaservice?: any; dataservice?: any; file?: any; } );
            /**
             * Retrieves asynchronously the metadata for the fault
             * @param callback  (Required) Success callback function
             * @param error  (Required) Error callback function
             */
            readMetadata(callback: Function, error: Function): XMLHttpRequest;
            /**
             * Retrieves asynchronously the data for the fault as json
             * @param callback  (Required) Success callback function
             * @param error  (Required) Error callback function
             */
            readData(callback: Function, error: Function): XMLHttpRequest;
        }
        /**
         * A connector for INTGeoServer 'Stream' GridSurfaces
         */
        class RemoteGridSurfaceDataSource {
            /**
             * A connector for INTGeoServer 'Stream' GridSurfaces
             * @param options  (Required) The options
             * @param options.server  (Required) The server url
             * @param options.metaservice  (Optional) The metadata service name
             * @param options.dataservice  (Optional) The data service name
             * @param options.file  (Optional) The file path
             */
            constructor(options: any | { server?: any; metaservice?: any; dataservice?: any; file?: any; } );
            /**
             * Retrieves asynchronously the metadata for the gridsurface
             * @param callback  (Required) Success callback function
             * @param error  (Required) Error callback function
             */
            readMetadata(callback: Function, error: Function): XMLHttpRequest;
            /**
             * Retrieves asynchronously the data for the gridsurface as Float32Array
             * @param callback  (Required) Success callback function
             * @param error  (Required) Error callback function
             */
            readDataArray(callback: Function, error: Function): XMLHttpRequest;
        }
        /**
         * A connector for INTGeoServer welllogs
         */
        class RemoteWelllogDataSource {
            /**
             * A connector for INTGeoServer welllogs
             * @param options  (Required) The options
             * @param options.server  (Required) The server url
             * @param options.metaservice  (Optional) The metadata service name
             * @param options.dataservice  (Optional) The data service name
             * @param options.file  (Optional) The file path
             */
            constructor(options: any | { server?: any; metaservice?: any; dataservice?: any; file?: any; } );
            /**
             * Retrieves asynchronously the metadata for the gridwell
             * @param callback  (Required) Success callback function
             * @param error  (Required) Error callback function
             */
            readMetadata(callback: Function, error: Function): XMLHttpRequest;
            /**
             * Retrieves asynchronously the data for the well
             * @param curveId  (Required) The curve to request id
             * @param callback  (Required) Success callback function
             * @param error  (Required) Error callback function
             */
            readCurve(curveId: string, callback: Function, error: Function): XMLHttpRequest;
        }
    }
}
