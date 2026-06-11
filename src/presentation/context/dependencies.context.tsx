// import React, { createContext, use, useMemo } from 'react';
// import type { PropsWithChildren } from 'react';

// import { DEPENDENCIES_TOKEN } from '@di/dependencies';
// import type { IDependencies } from '@di/dependencies';
// import { container } from '@di/container';

// const DependenciesContext = createContext<IDependencies | null>(null);

// export const DependenciesProvider: React.FC<PropsWithChildren> = ({ children }) => {
//   const dependencies = useMemo(() => container.resolve<IDependencies>(DEPENDENCIES_TOKEN), []);
//   return <DependenciesContext value={dependencies}>{children}</DependenciesContext>;
// };

// export const useDependencies = () => {
//   const context = use(DependenciesContext);

//   if (!context) throw new Error('useDependencies must be used within a DependenciesProvider');

//   return context;
// };
