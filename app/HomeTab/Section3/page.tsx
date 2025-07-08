'use client';
import { motion } from "framer-motion";
import React from 'react'

const Section3 = () => {
  return (
     <section className="snap-start h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }} 
          className="text-5xl text-white"
        >
          Section 3
        </motion.h1>
      </section>
  )
}

export default Section3
