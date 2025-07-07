import React, { useState } from "react";
import { Button } from "./button";
import { Badge } from "./badge";
import { CheckCircle, XCircle, Loader, ExternalLink } from "lucide-react";

interface PageStatus {
  name: string;
  path: string;
  status: "loading" | "success" | "error";
  error?: string;
}

export function PageStatusChecker() {
  const [isChecking, setIsChecking] = useState(false);
  const [pageStatuses, setPageStatuses] = useState<PageStatus[]>([
    { name: "Home", path: "/", status: "loading" },
    { name: "Vendor Listing", path: "/salons", status: "loading" },
    { name: "Vendor Dashboard", path: "/vendor-dashboard", status: "loading" },
    { name: "Admin Dashboard", path: "/admin", status: "loading" },
    { name: "Booking Flow", path: "/booking", status: "loading" },
    { name: "Membership", path: "/membership", status: "loading" },
    { name: "About", path: "/about", status: "loading" },
    { name: "Payment", path: "/payment", status: "loading" },
    { name: "Sign In", path: "/signin", status: "loading" },
    { name: "Sign Up", path: "/signup", status: "loading" },
    { name: "Forgot Password", path: "/forgot-password", status: "loading" },
  ]);

  const checkPageStatus = async (path: string): Promise<boolean> => {
    try {
      // Create a temporary iframe to test if the page loads without errors
      return new Promise((resolve) => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = path;

        iframe.onload = () => {
          document.body.removeChild(iframe);
          resolve(true);
        };

        iframe.onerror = () => {
          document.body.removeChild(iframe);
          resolve(false);
        };

        // Timeout after 5 seconds
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
          resolve(false);
        }, 5000);

        document.body.appendChild(iframe);
      });
    } catch (error) {
      return false;
    }
  };

  const checkAllPages = async () => {
    setIsChecking(true);

    for (let i = 0; i < pageStatuses.length; i++) {
      const page = pageStatuses[i];

      try {
        // Simple check - try to navigate and see if it works
        const isWorking = await checkPageStatus(page.path);

        setPageStatuses((prev) =>
          prev.map((p, index) =>
            index === i
              ? {
                  ...p,
                  status: isWorking ? "success" : "error",
                  error: isWorking ? undefined : "Failed to load",
                }
              : p,
          ),
        );

        // Small delay between checks
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        setPageStatuses((prev) =>
          prev.map((p, index) =>
            index === i
              ? {
                  ...p,
                  status: "error",
                  error:
                    error instanceof Error ? error.message : "Unknown error",
                }
              : p,
          ),
        );
      }
    }

    setIsChecking(false);
  };

  const getStatusIcon = (status: PageStatus["status"]) => {
    switch (status) {
      case "loading":
        return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: PageStatus["status"]) => {
    switch (status) {
      case "loading":
        return <Badge variant="secondary">Checking...</Badge>;
      case "success":
        return <Badge className="bg-green-100 text-green-800">Working</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
    }
  };

  // Only show in development
  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-md">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">
            Page Status Checker
          </h3>
          <Button
            size="sm"
            onClick={checkAllPages}
            disabled={isChecking}
            className="text-xs"
          >
            {isChecking ? "Checking..." : "Test All Pages"}
          </Button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {pageStatuses.map((page, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs"
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(page.status)}
                <span className="font-medium">{page.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(page.status)}
                <a
                  href={page.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {pageStatuses.some((p) => p.status === "error") && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-xs text-red-700">
              Some pages have errors. Check browser console for details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
