"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';


export default function TabularDisplay({ fileDetails }) {


  if (!fileDetails) return <> </>

  return (
    <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-6 py-3 text-left w-1/3">Filename</th>
            <th className="px-6 py-3 text-right w-1/3">Filesize</th>
            <th className="px-6 py-3 text-center w-1/3">Status</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(fileDetails).map(([key, file]) => (
            <tr key={key} className="border-t hover:bg-gray-100">
              <td className="px-6 py-3 w-1/3">{file.name}</td>
              <td className="px-6 py-3 text-right w-1/3">{file.size}</td>
              <td className="px-6 py-3 text-center w-1/3">
                <span
                  className={`${file.status === "Pending"
                    ? "text-yellow-500"
                    : file.status === "Failed"
                      ? "text-red-500"
                      : file.status === "Success"
                        ? "text-green-500"
                        : "text-gray-500"
                    } font-semibold`}
                >
                  {file.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
