import { ToastContainer } from "react-toastify";
import { GlobalStyles } from "./Styles/global";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { ThemeContext } from "./Context/ThemeContext";
import { ThemeProvider } from "styled-components";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

function App() {

  const {theme} = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* using the styles component */}
      {/* It has access to all the divs below and at the same level of this <GlobalStyles /> */}
      <GlobalStyles />

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/user' element={<UserPage/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
