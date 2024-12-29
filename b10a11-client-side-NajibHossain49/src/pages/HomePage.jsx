import React, { useEffect } from "react";
import { motion, useAnimation, useScroll, useInView } from "framer-motion";
import Banner from "../components/Banner";
import BookCategories from "../components/BookCategories";
import ExtraSection1 from "../components/ExtraSection1";
import ExtraSection2 from "../components/ExtraSection2";

const HomePage = () => {
  const { scrollYProgress } = useScroll();

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const ScrollAnimatedSection = ({ children }) => {
    const controls = useAnimation();
    const ref = React.useRef();
    const isInView = useInView(ref, {
      once: true,
      margin: "-100px"
    });

    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [controls, isInView]);

    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Banner />
      </motion.div>

      <ScrollAnimatedSection>
        <BookCategories />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection>
        <ExtraSection1 />
      </ScrollAnimatedSection>

      <ScrollAnimatedSection>
        <ExtraSection2 />
      </ScrollAnimatedSection>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

export default HomePage;