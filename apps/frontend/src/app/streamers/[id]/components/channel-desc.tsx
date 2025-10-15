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
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <TextEllipsis onClick={handleOverflowClick}>{content}</TextEllipsis>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Mô tả</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogTitle>Liên kết ngoài</DialogTitle>
        <DialogContent className="flex flex-col gap-1 w-[400px]">
          <Renderer
            list={links}
            render={(item, i) => (
              <a
                target="_blank"
                className="flex py-2 rounded px-4 bg-dark/5 hover:bg-dark/15 items-center gap-2 duration-150 hover:text-sky-500 text-gray-300"
                href={item.url}
                key={item.id}
              >
                {item.avatarUrl ? (
                  <img className="w-4 h-4" src={item.avatarUrl} alt="logo" />
                ) : (
                  <div className="w-3 h-3 bg-pink-800"></div>
                )}
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
