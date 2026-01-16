import { useEffect, useRef } from 'react';

/**
 * @param onScan callback invoked with the scanned string when Enter key is detected.
 * @param timeoutTime optional debounce timeout to distinguish scans vs manual typing (default: 100ms).
 */
function useQRScanner(
  onScan,
  timeoutTime
) {
  const bufferRef = useRef('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (e.key === 'Enter') {
        const scannedData = bufferRef.current;
        bufferRef.current = '';
        if (scannedData) {
          onScan(scannedData);
        }
        return;
      }

      if (e.key.length === 1) {
        bufferRef.current += e.key;
      }

      timeoutRef.current = setTimeout(() => {
        bufferRef.current = '';
      }, timeoutTime);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onScan, timeoutTime]);
}

export default useQRScanner;