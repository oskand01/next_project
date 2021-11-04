import Themeprovider from "../context/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout ({children}){
    return(
        <div>
            <Themeprovider>
                <Header/>
                {children}
                <Footer/>
           </Themeprovider>
        </div>
    );

}