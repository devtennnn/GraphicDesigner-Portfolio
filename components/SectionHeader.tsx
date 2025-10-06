import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold tracking-widest text-gray-700 uppercase">
        {title}
      </h2>
      <hr className="w-16 mx-auto mt-3 border-t border-gray-300" />
      <p className="mt-4 max-w-2xl mx-auto text-md text-gray-600">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
