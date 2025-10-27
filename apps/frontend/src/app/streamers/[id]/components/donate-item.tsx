'use client';
import { RSBDonation } from '@shop/type';
import { passiveOf, vnd } from '@shop/platform';
import { motion } from 'motion/react';

export const DonateItem: FCC<RSBDonation> = (donate) => {
  return (
    <>
      <motion.div className="flex gap-2 rounded-xl bg-gray-500/10 px-3 py-3">
        <div className="min-w-12 h-12 relative rounded-full overflow-hidden">
          <img alt="avatar" src="/avt.jpg" className="absolute w-full top-1/2 left-1/2 -translate-1/2" />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <span>
              {donate.sender.firstname} {donate.sender.lastname}
            </span>
            <span className="text-xs text-gray-400 pl-2">{passiveOf(donate.createdAt)}</span>
          </div>
          <div>
            <span className="text-green-500 pr-1">{vnd(donate.amount)}</span>
            <span className="text-xs text-gray-300">kèm lời nhắn</span>
          </div>
          <div>{donate.message}</div>
        </div>
      </motion.div>
    </>
  );
};
