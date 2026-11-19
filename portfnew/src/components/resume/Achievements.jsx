import React from 'react'
import ResumeCard from './ResumeCard'
import Title from '../layouts/Title'
import { motion } from 'framer-motion'

const Achievements = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1, transition: { duration: 0.5 } }} 
      className='w-full flex flex-col gap-8'
    >
      <div className='py-6 font-[var(--font-title)]'>
        <p className='text-sm text-[var(--color-designColor)] tracking-[4px]'>Achievements & Highlights</p>
        <h2 className='text-4xl font-bold'>My Achievements</h2>
      </div>

      <div className='w-full h-auto border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10'>
        <ResumeCard
          title='400+ LeetCode Problems Solved'
          subTitle='Data Structures & Algorithms'
          result='LeetCode'
          des='Demonstrated strong problem-solving skills by solving over 400 DSA problems on LeetCode, sharpening problem-solving and algorithmic thinking.'
        />
      </div>
    </motion.div>
  )
}

export default Achievements
