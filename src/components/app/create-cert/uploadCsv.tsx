import { Button } from '@/components/ui/button';
import React, { CSSProperties, useState } from 'react';
import { useCSVReader } from 'react-papaparse';
interface Props {
    setCSV(results: any): void
}

const UploadCsv: React.FC<Props> = (props) => {
    const { CSVReader } = useCSVReader();
    const { setCSV } = props
    return (
        <CSVReader
            onUploadAccepted={(results: any) => setCSV(results)}
        >
            {({
                getRootProps,
            }: any) => (
                <>
                    <div>
                        <Button {...getRootProps()}>Upload CSV</Button>
                    </div>
                </>
            )}
        </CSVReader>
    );
};

export default UploadCsv;
