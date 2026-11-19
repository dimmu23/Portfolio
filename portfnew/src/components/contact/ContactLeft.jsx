import React from 'react';
import { contactImg } from '../../assets/index.js';
import { FaGithub, FaCode, FaLinkedinIn } from 'react-icons/fa';

const ContactLeft = () => {
    return (
        <div className='w-full lg:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-8 flex flex-col gap-8 justify-center rounded-lg shadow-[var(--shadowOne)]'>
            <img
                className='w-full h-64 object-cover rounded-lg'
                src={contactImg}
                alt="contactImg"
            />
            <div className='flex flex-col gap-3'>
                <h3 className='text-3xl font-bold text-white'>
                    Sumit Saraswat
                </h3>
                <p className='text-lg font-normal text-gray-400'>
                    Software Engineer
                </p>
                <p className='text-base text-gray-400 tracking-wide'>
                    "I'm always open to new projects, creative collaborations, and opportunities. Have a question or want to work together? Feel free to reach out!"
                </p>
                <p className='text-base text-gray-400 flex items-center gap-2'>
                    Phone: <span className='text-[var(--color-lighttext)]'>+91 6350248296</span>
                </p>
                <p className="text-base text-gray-400 flex items-center gap-2">
                    Email: <span className="text-[var(--color-lighttext)]">sumitsaraswat2308@gmail.com</span>
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="text-base uppercase font-[var(--font-title)] text-[var(--color-lighttext)] tracking-wide">
                    Connect
                </h2>

                <div className="flex gap-4">
                    {/* GitHub */}
                    <a
                        href="https://github.com/dimmu23"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 flex items-center justify-center rounded-md bg-black text-white
        transition-all duration-300 ease-in-out hover:text-[var(--color-designColor)]
        hover:scale-110 hover:shadow-[0_0_10px_var(--color-designColor)]"
                        title="GitHub"
                    >
                        <FaGithub size={20} />
                    </a>

                    {/* LeetCode */}
                    <a
                        href="https://leetcode.com/u/22uec138/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 flex items-center justify-center rounded-md bg-black text-white
        transition-all duration-300 ease-in-out hover:text-[var(--color-designColor)]
        hover:scale-110 hover:shadow-[0_0_10px_var(--color-designColor)]"
                        title="LeetCode"
                    >
                        <FaCode size={20} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/sumit2saraswat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 flex items-center justify-center rounded-md bg-black text-white
        transition-all duration-300 ease-in-out hover:text-[var(--color-designColor)]
        hover:scale-110 hover:shadow-[0_0_10px_var(--color-designColor)]"
                        title="LinkedIn"
                    >
                        <FaLinkedinIn size={20} />
                    </a>
                </div>
            </div>

        </div>
    );
};

export default ContactLeft;
