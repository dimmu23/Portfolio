import React from 'react'
import Title from '../layouts/Title'
import Card from './Card'
import { AiFillCode, AiFillLayout, AiFillInteraction, AiFillSignal, AiFillEdit } from 'react-icons/ai';

const Features = () => {
  return (
    <section id="features" className='w-full py-20 border-b-[1px] border-b-black'>
      <div className='flex justify-center items-center text-center mb-12'>
        <Title des="Features" />
      </div>
      {/* Added spacing div here with mt-12 (3rem) */}
      <div className='mt-12 flex flex-col items-center'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-20'>
          <Card
            title="Web Development"
            des="I build full-stack applications using Next.js, React, Node.js, and TypeScript."
            icon={<AiFillCode />}
          />

          <Card
            title="AI Applications"
            des="I build AI-powered applications with RAG, LLMs, embeddings, and Qdrant vector databases."
            icon={<AiFillInteraction />}
          />

          <Card
            title="Backend Development"
            des="I develop REST APIs and asynchronous background pipelines using Express.js, PostgreSQL, Redis, and BullMQ."
            icon={<AiFillSignal />}
          />

          {/* Placeholder for future cards */}
          <div className="hidden md:block lg:hidden"></div> {/* Spacer for even layout */}
        </div>
      </div>

    </section>
  )
}

export default Features