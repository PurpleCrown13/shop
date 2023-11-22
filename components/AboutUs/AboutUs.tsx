import '../AboutUs/About.css';
import { motion } from 'framer-motion'; 
import { Helmet } from "react-helmet";
import { Text, Paper } from '@mantine/core';

function AboutUs() {
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0.6 } }
    };

    const blockVariants = {
        hidden: {
            opacity: 0,
            scale: 0.6,
            y: 50,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'tween', 
                duration: 0.5 
            },
        }
    };

    return (
        <motion.div className='about' initial='hidden' animate='visible' variants={containerVariants}>
            
            <Helmet>
                <title>About Us</title>
            </Helmet>
            <motion.div className='about-block' variants={blockVariants}>
                <Paper shadow="xl" p="xl" className='paper'>
                    <Text><div className='about-title'>Welcome to the World of Style!</div></Text>
                    <Text>
                        <div className='about-text'>
                            At "Shop," we offer you the best fashion trends to create a unique style. From classic looks to modern trends, we have everything you need to express your individuality through clothing.
                        </div>
                    </Text>
                </Paper>
            </motion.div>
            <motion.div className='about-block' variants={blockVariants}>
                <Paper shadow="xl" p="xl" className='paper'>
                    <Text><div className='about-title'>Quality You Can Trust</div></Text>
                    <Text>
                        <div className='about-text'>
                            At "Shop," we take pride in offering high-quality products. Our clothing is crafted with attention to detail and love for every stitch. We believe that quality materials are the key to durability and satisfaction with your purchase.
                        </div>
                    </Text>
                </Paper>
            </motion.div>
            <motion.div className='about-block' variants={blockVariants}>
                <Paper shadow="xl" p="xl" className='paper'>
                    <Text><div className='about-title'>Trendy Collections Every Season</div></Text>
                    <Text>
                        <div className='about-text'>
                            Stay ahead of fashion with our regularly updated collections at "Shop." Our stylists keep an eye on the latest trends to bring you the most current and stylish pieces every season.
                        </div>
                    </Text>
                </Paper>
            </motion.div>
            <motion.div className='about-block' variants={blockVariants}>
                <Paper shadow="xl" p="xl" className='paper'>
                    <Text><div className='about-title'>Convenient Online Shopping at "Shop"</div></Text>
                    <Text>
                        <div className='about-text'>
                            At "Shop," we value your time. Our user-friendly interface makes online shopping easy and enjoyable. Browse, choose, and order fashionable finds with ease, all from the comfort of your home.
                        </div>
                    </Text>
                </Paper>
            </motion.div>
        </motion.div>
    )
}

export default AboutUs;
