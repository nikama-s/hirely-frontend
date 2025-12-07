interface AuthSubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  defaultText: string;
}

export const AuthSubmitButton = ({
  isLoading,
  loadingText,
  defaultText
}: AuthSubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="group relative flex w-full justify-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoading ? loadingText : defaultText}
    </button>
  );
};
