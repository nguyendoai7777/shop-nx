'use client';
import { TextEllipsis } from '@components';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { ExternalLinkResponseSchema } from '@shop/type';
import { Renderer } from '@components';

export interface TextEllipsisClickableProps {
  content: string;
  links: ExternalLinkResponseSchema[];
}

const ChannelDescription: FCC<TextEllipsisClickableProps> = ({ content, children, links }) => {
  const [open, setOpen] = useState(false);
  const handleOverflowClick = () => {
    console.log('Overflow clicked:');
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <TextEllipsis onEllipsis={handleOverflowClick}>{content}</TextEllipsis>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Mô tả</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogTitle>Liên kết ngoài</DialogTitle>
        <DialogContent>
          <Renderer
            list={links}
            render={(item, i) => (
              <a
                target="_blank"
                className="block hover:underline duration-150 hover:text-sky-500 text-gray-300"
                href={item.url}
                key={item.id}
              >
                {item.shortname}
              </a>
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ChannelDescription;
