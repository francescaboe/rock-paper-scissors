import React from 'react';
import Loading from 'components/Loading';
import Error from 'components/Error';

/**
 * A custom React hook that provides a standardized way to make API calls and handle loading and error states.
 *
 * The `useApiCall` hook returns an object with the following properties:
 * - `isLoading`: a boolean indicating whether the API call is currently in progress
 * - `error`: an `Error` object if the API call failed, or `null` if the call was successful
 * - `callApi`: a memoized function that takes an API function and returns a Promise with the result of the API call
 * - `LoadingComponent`: a React component that displays a loading indicator if `isLoading` is true
 * - `ErrorComponent`: a React component that displays an error message if `error` is not null
 *
 * To use the `useApiCall` hook, you can call it in your component and destructure the returned object:
 *
 *
 * const { isLoading, error, callApi, LoadingComponent, ErrorComponent } = useApiCall();
 *
 * const fetchData = async () => {
 *   const data = await callApi(() => fetchSomeData());
 *   // use the data
 * };
 *
 * return (
 *   <div>
 *     // render your component
 *     {LoadingComponent}
 *     {ErrorComponent}
 *   </div>
 * );
 *
 */
function useApiCall() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const callApi = React.useCallback(async <T,>(apiFunction: () => Promise<T>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiFunction();
      return result;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    callApi,
    LoadingComponent: isLoading ? <Loading /> : null,
    ErrorComponent: error ? <Error message={error} /> : null,
  };
}

export default useApiCall;
