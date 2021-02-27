```jsx
import { Button } from './button';
import { Foldable } from './foldable';

const Demo = () => {
  const [foldAngle, setFoldAngle] = React.useState(60);

  return (
    <div className="bg-gray-200 p-3">
      <div className="p-6">
        <Foldable
          percentage={Number(foldAngle)}
          topContent={
            <div className="h-full flex justify-center items-center">
              <h1 className="text-3xl font-medium">Hello!</h1>
            </div>
          }
          bottomContent={
            <div className="h-full flex justify-center items-center p-3">
              <Button color="primary">CLICK</Button>
            </div>
          }
          width={300}
          height={300}
          wrapperClass="mx-auto"
        />
      </div>
      <div className="px-6 py-3">
        <input
          type="range"
          min={0}
          max={100}
          value={foldAngle}
          onChange={(ev) => setFoldAngle(ev.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

<Demo />;
```

```jsx
import cx from 'classnames';
import { FaSpinner } from 'react-icons/fa';
import { useDebounce } from '../hooks/use-debounce';
import { Foldable } from './foldable';

const Demo = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const shouldClose = useDebounce(isLoading, 550);

  return (
    <div>
      <Foldable
        percentage={shouldClose ? 100 : 0}
        topContent={
          <div className="h-full flex items-center justify-center">
            <p className="text-3xl">You content is ready</p>
          </div>
        }
        bottomContent={
          <div className="h-full flex items-center justify-center">
            <button
              onClick={() => alert('Download')}
              className="text-blue-600 cursor-pointer px-3"
            >
              Download
            </button>
          </div>
        }
        backContent={
          <div
            className={cx(
              'h-full flex items-center justify-center transition-opacity duration-500 ease-linear',
              isLoading ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className="text-center">
              <p className="text-xl text-black mb-3">Preparing...</p>
              <FaSpinner className="w-10 h-10 animate-spin z-10 text-white mx-auto" />
            </div>
          </div>
        }
        width={300}
        height={300}
        wrapperClass="mx-auto"
      />
      <div className="p-6 text-center">
        <button
          onClick={() => setIsLoading((l) => !l)}
          className="px-3 py-1 shadow"
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

<Demo />;
```
