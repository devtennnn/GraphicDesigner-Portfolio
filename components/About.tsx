import React from 'react';
import type { Language } from '../types';

interface AboutProps {
  language: Language;
}

const About: React.FC<AboutProps> = ({ language }) => {
  
  const content = {
    en: {
      title: 'Creative Graphic Designer & Developer',
      description: "Hello! I'm a designer and developer based in Phnom Penh. I love creating designs that are clean, modern, and effective, and building functional, user-friendly web experiences. I believe good design and code can solve problems and help businesses grow.",
      alt: "Profile picture of TEN Designer",
      toolsTitle: "My Go-To Tools",
    },
    km: {
      title: 'អ្នករចនាក្រាហ្វិក និងអ្នកអភិវឌ្ឍន៍ប្រកបដោយភាពច្នៃប្រឌិត',
      description: "សួស្តី! ខ្ញុំ​ជា​អ្នក​រចនា​ និងអ្នកអភិវឌ្ឍន៍​ដែល​មាន​មូលដ្ឋាន​នៅ​ទីក្រុង​ភ្នំពេញ។ ខ្ញុំ​ចូលចិត្ត​បង្កើត​ការ​រចនា​ដែល​ស្អាត ទំនើប និង​មាន​ប្រសិទ្ធភាព និងបង្កើត​បទពិសោធន៍​គេហទំព័រ​ដែល​មាន​មុខងារ និង​ងាយស្រួល​ប្រើ។ ខ្ញុំ​ជឿជាក់​ថា​ការ​រចនា និង​កូដ​ដ៏​ល្អ​អាច​ដោះស្រាយ​បញ្ហា និង​ជួយ​ឱ្យ​អាជីវកម្ម​រីកចម្រើន។",
      alt: "រូបថតប្រវត្តិរូបរបស់ TEN ឌីហ្សាញ",
      toolsTitle: "ឧបករណ៍ដែលខ្ញុំប្រើប្រាស់",
    }
  }

  const tools = [
    { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg' },
    { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg' },
    { name: 'After Effects', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg' },
    { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg' },
    { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg'},
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 animated-gradient overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex justify-center">
            <img
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover shadow-md"
              src="https://i.postimg.cc/T1MvnzD9/PROFILE.jpg"
              alt={content[language].alt}
            />
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {content[language].title}
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              {content[language].description}
            </p>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-20 text-center">
          <h2 className="text-lg font-semibold tracking-widest text-gray-700 uppercase">
            {content[language].toolsTitle}
          </h2>
          <div className="mt-8 relative">
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[infinite-scroll_40s_linear_infinite]">
                {tools.map((tool) => (
                  <li key={tool.name}>
                    <img src={tool.icon} alt={tool.name} className="h-10 sm:h-12 w-auto" />
                  </li>
                ))}
              </ul>
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[infinite-scroll_40s_linear_infinite]" aria-hidden="true">
                 {tools.map((tool) => (
                  <li key={`${tool.name}-2`}>
                    <img src={tool.icon} alt={tool.name} className="h-10 sm:h-12 w-auto" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

         <hr className="border-t border-gray-200 w-full mx-auto mt-16 sm:mt-20 md:mt-28" />
      </div>
    </section>
  );
};

export default About;
