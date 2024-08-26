import React from 'react';
import i18n from 'i18next';

export const onCopyToClipboard = async (
  event: React.MouseEvent<HTMLButtonElement>,
): Promise<void> => {
  const button = event.currentTarget;
  const textToCopy = button.value;

  try {
    await navigator.clipboard.writeText(textToCopy);
    // Store the original button text
    const originalText = button.innerText;

    // Provide feedback to the user
    button.innerText = i18n.t('copied');

    setTimeout(() => {
      // Revert to the original text after 2 seconds
      button.innerText = originalText;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text to clipboard: ', err);
    button.innerText = 'Failed to copy';
    setTimeout(() => {
      // Revert to the original text after failure
      button.innerText = 'Copy';
    }, 2000);
  }
};
