import React from 'react';
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import {Root} from '../component/Root';
import {Search} from '../component/Search';
import {MyPhotos} from '../component/MyPhotos'



const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<Root />} />
    <Route path='/gallery-app' element={<Root />} />
    <Route path='/search' element={<Search /> } />
    <Route path='/myPhotos' element={<MyPhotos />} /> 
  </>
  
));


function App() {
  return (
  <>
    <RouterProvider router={router} />
  </>
  );
}

export default App;
