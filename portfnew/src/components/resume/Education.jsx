import React from 'react'
import ResumeCard from './ResumeCard'
import Title from '../layouts/Title'
import { motion } from 'framer-motion';


const Education = () => {
    return (
        // Two-column layout
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 , transition: { duration: .5 } }}
          className='w-full flex flex-col lgl:flex-row gap-8'>
            {/* Left Column - Education */}
            <div className='flex-1'>
                    <div className='py-6 font-[var(--font-title)]'>
                        <p className='text-sm text-[var(--color-designColor)] tracking-[4px]'>2020 - 2026</p>
                        <h2 className='text-4xl font-bold'>Education Qualification</h2>
                    </div>

                    <div className='mt-6 w-full h-auto border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10'>
                        <ResumeCard
                            title='Electronics and Communication Engineering'
                            subTitle='The LNM Institute of Information Technology, Jaipur (2022 - 2026)'
                            result='7.14/10 (CGPA)'
                            des='Bachelor of Technology in Electronics and Communication Engineering (2022–2026).'
                        />
                        <ResumeCard
                            title='Senior Secondary Education'
                            subTitle='S.L. Memorial English School, Nokha (2020 - 2021)'
                            result='98.40%'
                            des='Scored 98.40% in the Class 12 RBSE Examination.'
                        />
                    </div>
        </div>

    {/* Right Column - JEE Achievements */}
    <div className='flex-1'>
            <div className='py-6 font-[var(--font-title)]'>
                <p className='text-sm text-[var(--color-designColor)] tracking-[4px]'>Competitive Exams</p>
                <h2 className='text-4xl font-bold'>JEE Performance</h2>
            </div>

                    <div className='mt-6 w-full h-auto border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10'>
                        <ResumeCard
                            title='JEE Main'
                            subTitle='National Testing Agency (2022)'
                            result='AIR 39,081'
                            des='Secured All India Rank 39,081 in JEE Main 2022 among over one million candidates.'
                        />
                    </div>
                </div>
            </motion.div>
    )
}

export default Education
