
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home } from "lucide-react";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bloom-container py-12 md:py-24 flex items-center justify-center">
      <Card className="w-full max-w-md border-2 border-gray-100">
        <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 p-4">
              <ShieldAlert className="h-12 w-12 text-red-500" />
            </div>
          </div>
          <CardTitle className="text-2xl text-bloom-pink">Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            You don't have sufficient permissions to access this page.
          </p>
          <p className="text-gray-600">
            Please contact an administrator if you believe this is an error.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button 
            onClick={() => navigate("/")}
            className="w-full bg-bloom-green hover:bg-bloom-green/90"
          >
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="w-full"
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
