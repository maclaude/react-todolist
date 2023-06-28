import { Toaster, toast } from 'react-hot-toast';

import '../styles/Buttons.scss';

export const ToasterElement = () => {
  const notify = () =>
    toast('Here is your toast', {
      duration: 4000,
      position: 'top-right',

      // Styling
      style: {},
      className: '',

      // Custom Icon
      icon: '🍞',

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },

      // Aria
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });

  return (
    <div>
      <button className="btn btn_regular" onClick={notify}>
        Make me a toast
      </button>
      <Toaster />
    </div>
  );
};
