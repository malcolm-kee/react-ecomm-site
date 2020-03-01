import * as React from 'react';
import { Input } from '../components/input';
import { Seo } from '../components/seo';
import serverWoman from '../images/server-woman.png';

export const CareersPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Seo title="Careers - Shopit" />
      <div className="block sm:hidden text-center">
        <img
          src={serverWoman}
          width="300"
          height="300"
          alt=""
          className="mx-auto"
        />
      </div>
      <div className="sm:flex items-center">
        <div className="flex-1 text-center sm:text-right">
          <h1 className="text-4xl sm:text-5xl text-gray-700">
            Careers in Shopit
          </h1>
          <p>Change the World, Differently</p>
          <div className="inline-block w-56 my-4">
            <Input
              type="search"
              list="positions"
              placeholder="Search open positions"
            />
            <datalist id="positions">
              <option>Janitor</option>
              <option>Slack Chatter</option>
              <option>GitHub Issue Commentor</option>
              <option>Memer</option>
            </datalist>
          </div>
        </div>
        <div className="hidden sm:block flex-1">
          <img src={serverWoman} width="600" height="600" alt="" />
        </div>
      </div>
    </div>
  );
};
