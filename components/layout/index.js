import Categories from "./Categories";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout ({children}){
    return(
        <div>
           <Header/>
           <Categories />
           {children}
           <Footer/>
        </div>
    );

}