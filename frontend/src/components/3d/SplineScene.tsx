import Spline from '@splinetool/react-spline';

export default function SplineScene() {
    return (
        <div className="w-full h-full bg-blue-50/50 dark:bg-gray-900/50 pointer-events-auto">
            {/* Using a known working Spline scene */}
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </div>
    );
}
