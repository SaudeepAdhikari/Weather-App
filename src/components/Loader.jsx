import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ loading, error }) {
  return (
    <>
      {loading && (
        <motion.div
          className="loading"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          Loading...
        </motion.div>
      )}
      {error && <div className="error">{error}</div>}
    </>
  );
}
