import React, { useRef, useState, useEffect } from 'react';

import { Box } from '@mui/material';

import { MM_TO_PX } from '../until';

export default function SplitPages({ htmlString,width,height }) {
  const measureRef = useRef(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const totalHeight = measureRef.current.scrollHeight;
    const count = Math.ceil(totalHeight / MM_TO_PX(height) );
    setPageCount(count);
  }, [htmlString]);

  const pages = [];
  for (let i = 0; i < pageCount; i++) {
    const offsetY = -i * height;
    pages.push(
      <Box
        key={i}
        sx={{
          width: `${width}mm`,
          height:`${height}mm`,
          padding: "5mm",
          overflow: 'hidden',
          border: '1px solid #ccc',
          margin: '20px auto',
          background: 'white',
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            transform: `translateY(${offsetY}mm)`,
            transformOrigin: 'top left',
          }}
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        ref={measureRef}
        sx={{
          position: 'absolute',
          top: -9999,
          left: -9999,
          width: `${width}mm`,
          visibility: 'hidden',
        }}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
      {pages}
    </Box>
  );
}