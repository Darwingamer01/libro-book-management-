
import { motion } from 'framer-motion';

export default function CSSFloatingBook() {
    return (
        <div className="w-full h-full flex items-center justify-center perspective-[1000px] bg-blue-50/50 dark:bg-gray-900/50">
            <motion.div
                className="relative w-64 h-80 preserve-3d"
                animate={{
                    rotateY: [0, -20, 0, 10, 0],
                    rotateX: [0, 5, 0, -5, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                }}
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Front Cover */}
                <div className="absolute inset-0 bg-blue-600 rounded-r-md border border-blue-700 shadow-xl flex items-center justify-center backface-hidden"
                    style={{ transform: 'translateZ(25px)' }}>
                    <div className="text-white text-center">
                        <div className="text-4xl font-bold mb-2">Libro</div>
                        <div className="text-sm opacity-80">Premium Library</div>
                    </div>
                    {/* Spine crease */}
                    <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent"></div>
                </div>

                {/* Back Cover */}
                <div className="absolute inset-0 bg-blue-600 rounded-l-md border border-blue-700"
                    style={{ transform: 'translateZ(-25px) rotateY(180deg)' }}>
                </div>

                {/* Spine */}
                <div className="absolute left-0 top-0 bottom-0 w-[50px] bg-blue-800 rounded-l-sm"
                    style={{ transform: 'rotateY(-90deg) translateZ(0px) translateX(-25px)', height: '100%' }}>
                </div>

                {/* Pages (Right Side) */}
                <div className="absolute right-0 top-2 bottom-2 w-[50px] bg-white border border-gray-200"
                    style={{ transform: 'rotateY(90deg) translateZ(-25px)' }}>
                    <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,#eee_1px,#eee_2px)]"></div>
                </div>

                {/* Pages (Top) */}
                <div className="absolute top-0 right-0 left-0 h-[50px] bg-white border border-gray-200"
                    style={{ transform: 'rotateX(90deg) translateZ(25px)' }}>
                    <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#eee_1px,#eee_2px)]"></div>
                </div>

                {/* Pages (Bottom) */}
                <div className="absolute bottom-0 right-0 left-0 h-[50px] bg-white border border-gray-200"
                    style={{ transform: 'rotateX(-90deg) translateZ(295px)' }}>
                    <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#eee_1px,#eee_2px)]"></div>
                </div>
            </motion.div>

            {/* Shadow */}
            <div className="absolute bottom-20 w-64 h-12 bg-black/20 blur-xl rounded-full animate-pulse" style={{ transform: 'rotateX(70deg)' }}></div>
        </div>
    );
}
