import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Compass } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl"></div>
      </div>

      <Card className="w-full max-w-md mx-auto border-0 bg-slate-800/50 backdrop-blur-sm shadow-2xl overflow-hidden relative z-10">
        <CardContent className="p-8 text-center">
          {/* Animated Compass */}
          <div className="mb-8 relative">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                <Compass className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xs font-bold">?</span>
              </div>
            </div>

            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 mb-2">
              404
            </div>
            <div className="text-lg font-semibold text-gray-300">
              Route Not Found
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white mb-3">
              You've Reached Unknown Territory
            </h1>
            <p className="text-gray-400 leading-relaxed">
              The coordinates you're looking for don't exist in our navigation
              system. Let's get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full h-12 border-slate-600 text-white hover:bg-slate-700 hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retrace Steps
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="w-full h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white transition-all duration-200 shadow-lg hover:shadow-primary/25"
            >
              <Home className="h-4 w-4 mr-2" />
              Return to Base
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
