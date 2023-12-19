import { get_products } from "../api/products";
import ProductCard from "../components/ProductCard";
import { Product } from "../Interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { useSearchStore } from "../store/search";
import SearchResults from "./SearchResults";

const HomePage = () => {

    const { ref, inView } = useInView();
    const searchTerm = useSearchStore((state) => state.searchTerm);

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    const {
        data,
        isLoading,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(["products"], get_products, {
        getNextPageParam: (page: any) => page.meta.next,
    });


    if (searchTerm) return <SearchResults />
    if (error instanceof Error) return <>{toast.error(error.message)}</>;

    return (
        <>
        
            {data?.pages.map((page: any) => (
                <>
                    <div className="flex justify-center">
                        <div
                            key={page.meta.next}
                            className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16"
                        >
                            {page.data.map((product: Product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>

                    {!isLoading && data?.pages.length === 0 && (
                        <p className="text-xl text-slate-800 dark:text-slate-200">
                            No mas resultados
                        </p>
                    )}
                    {!isLoading &&
                        data?.pages?.length !== undefined &&
                        data.pages.length > 0 &&
                        hasNextPage && (
                            <div ref={ref}>
                                {isLoading || isFetchingNextPage ? (
                                    <Loader />
                                ) : null}
                            </div>
                        )}
                </>
            ))}
            <footer className="bg-gray-800 py-8">
        <div className="container mx-auto flex justify-between">

          {/* Redes Sociales */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Síguenos en </h3>
            <li>
                <a href="https://www.facebook.com/profile.php?id=100068130249213" target="_blank">
                <img src="./public/facebook.svg" alt="facebook" />
                </a>
            </li>
            <li>
               <a href="https://twitter.com/" target="_blank">
               <img src="./public/twitter.svg" alt="twitter" />
               </a>
            </li>
            <li>
                <a href="https://www.instagram.com/" target="_blank">
                <img src="./public/instagram.svg" alt="instagram" />
                </a>
            </li>
            
          </div>

          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15054.376712369289!2d-97.9665994!3d19.386717!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cffced901ddce7%3A0x900a8087658724ce!2sUniversidad%20Tecnol%C3%B3gica%20de%20Tlaxcala!5e0!3m2!1ses-419!2smx!4v1702640542135!5m2!1ses-419!2smx" width="900" height="200" className="w-full h-full md:h-80"></iframe>

        </div>
      </footer>
        </>
    );
};




export default HomePage;
