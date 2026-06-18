// import { MinimalFooter } from "@/react-toolkit/layout/MinimalFooter";
// import { Separator } from "@/react-toolkit/ui/separator";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  // Get the error object
  const error = useRouteError() as {
    message: string;
    status?: number;
    statusText?: string;
  };

  return (
    <div className="flex h-screen w-full flex-col items-center p-3 lg:w-full">
      <div className="flex w-full items-center justify-between p-5 xs:p-3">
        <a className="h-[2.65rem] px-3.5 py-3" href="/">
          {/* Default logo for larger screens */}
          <img className="h-[2.1875rem]" src="./logo.svg" alt="Logo" />
        </a>
      </div>

      <div className="-mt-4 flex grow flex-col items-center justify-center gap-3 text-sm text-gray-600 lg:flex">
        <ExclamationTriangleIcon className="h-[25%] stroke-1 text-gray-600 opacity-40 lg:h-[25%]" />

        <h2 className="text-xl text-destructive-foreground">Error!</h2>

        {/* <Separator orientation="vertical" className="hidden h-10 w-[1px] rounded-full bg-gray-600 lg:flex" /> */}

        {error?.statusText || error?.message ? (
          <p>{error.statusText || error.message}</p>
        ) : (
          <p>Something went wrong</p>
        )}
      </div>

      {/* <MinimalFooter /> */}
    </div>
  );
};

export { ErrorPage };
