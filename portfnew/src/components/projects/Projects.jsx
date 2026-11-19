import React from 'react'
import Title from '../layouts/Title'
import ProjectsCard from './ProjectsCard'

const Projects = () => {
    return (
        <section
            id="projects"
            className='w-full py-20 border-b-[1px] border-b-black'>
            <div className='flex justify-center items-center text-center mb-12'>
                <Title des="My Projects" />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 xl:gap-14'>
                <ProjectsCard
                    title="Daily-Digest: AI-Powered UPSC News Platform"
                    des="Built a PIB current-affairs platform using Next.js, Prisma, PostgreSQL, Redis, and Cerebras API. Converts official releases into UPSC-focused summaries and exam-ready notes. An asynchronous BullMQ pipeline reduced sync time from 60 seconds to 2–3 seconds; duplicate-job prevention and worker monitoring improved reliability."
                    liveLink="https://pib-daily-digest.vercel.app"
                    isEven={true}
                />

                <ProjectsCard
                    title="Paperfy: AI Research Paper Assistant"
                    des="Built a full-stack AI research paper assistant with PDF upload, summarization, document chat, notes, audio generation, and research history. Uses Next.js, Gemini, Prisma, PostgreSQL, Tailwind, and Qdrant. A RAG pipeline enables context-aware answers, while BullMQ and Redis reduced PDF processing wait time by over 90%."
                    liveLink="https://paperfy-lovat.vercel.app/"
                    isEven={true}
                />
            </div>
        </section>
    )
}

export default Projects