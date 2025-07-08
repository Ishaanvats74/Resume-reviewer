'use client';
import { motion } from "framer-motion";
import React from 'react'

const Section2 = () => {
  return (
      <section className="snap-start h-screen bg-gradient-to-r from-green-400 to-lime-500 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }} 
          className="text-5xl text-white"
        >
          Section 2
        </motion.h1>
      </section>
  )
}

export default Section2
