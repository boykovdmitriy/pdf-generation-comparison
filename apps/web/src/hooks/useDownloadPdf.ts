import { IInvoice } from '../types/invoice';
import { useCallback, useState } from 'react';
import { downloadFile } from '../utils/downloadFileByFetch';

type Props = {
  data: IInvoice;
  engine: string;
};
export const useDownloadPdf = ({ data, engine }: Props) => {
  const [inProgress, setInProgress] = useState(false);
  const onDownload = useCallback(async () => {
    setInProgress(true);
    await downloadFile(`pdf/${engine}`, {
      body: JSON.stringify(data),
      method: 'POST',
    });
    setInProgress(false);
  }, [data, engine]);
  return { inProgress, onDownload };
};
