import './App.scss';
import DrawAnnotations from './component/DrawAnnotations';


function App() {
  return (
    <div className="appHeading">
    <h1 className='text-3xl font-bold uppercase flex p-4'>Image Annotation Tool</h1>
    <DrawAnnotations />
  </div>
  );
}

export default App;
