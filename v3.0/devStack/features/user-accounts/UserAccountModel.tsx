import { logoffFromCurrentSession } from "../../apis/accounts-me-apis";
import { cn } from "../../lib/utils";
import { useUserSessionStore } from "../../stores/user-session-store";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Button } from "../../ui/buttons/Button";
import { buttonVariants } from "@/ui-kit/ui/buttons/button-variants";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui-kit/ui/popover";
import { Separator } from "@/ui-kit/ui/separator";
import { removeUserSessionLocally } from "../../utils/user-session-utils";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserAccountModalProps {
  /** Additional class name to override popover content container style */
  className?: string;
  /** Additional class name to override avatar size. Only pass h-, w- */
  sizeClassName?: string;
}

const UserAccountModal = ({
  className,
  sizeClassName = "h-9 w-9",
}: UserAccountModalProps) => {
  // Get user session state and actions
  const { userSession, setUserSession } = useUserSessionStore();
  // Get navigate function
  const navigate = useNavigate();

  // Define mutation to log off from the current session
  const { mutate, isPending } = useMutation({
    mutationFn: logoffFromCurrentSession,
    onSuccess: (httpResponse) => {
      if (httpResponse.data) {
        setUserSession(null);
        removeUserSessionLocally();
        navigate(
          `/redirect?msg=Logging out...&url=${import.meta.env.VITE_ACCOUNTS_URL}`
        );
      } else {
        toast.error(httpResponse.message);
      }
    },
    onError: (error) => {
      toast.error(error.toString());
    },
  });

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "rounded-full",
          sizeClassName
        )}
      >
        <Avatar className={cn("flex", sizeClassName)}>
          <AvatarFallback className="capitalize">
            {userSession ? userSession.userInitials : "**"}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="end" className={cn("flex w-[15rem] flex-col p-1", className)}>
        {/* Header */}
        <div className={cn("flex flex-col justify-center gap-1 px-3.5 pb-2 pt-2.5")}>
          <span className="truncate whitespace-nowrap text-base font-medium uppercase leading-4">
            {userSession ? `${userSession.firstName} ${userSession.lastName}` : "User Name"}
          </span>
          <span className="truncate whitespace-nowrap text-2xs font-normal lowercase">
            {userSession ? userSession.email : "useremail@domain.com"}
          </span>
        </div>

        <Separator className="my-1 h-[0.5px]" />

        {/* Logout */}
        <Button
          variant="ghost"
          className="h-9 justify-start gap-2 rounded-sm font-normal"
          onClick={() => mutate()}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-[--icon-color]" />
          ) : (
            <ArrowLeftStartOnRectangleIcon className="h-4 w-4" />
          )}
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export { UserAccountModal };
