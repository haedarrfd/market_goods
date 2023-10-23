"use client";

import { useState, Fragment, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { addUserToProduct } from "@/lib/actions";

interface ModalProps {
  productId: string;
}

const Modal = ({ productId }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Add user email to product
    await addUserToProduct(productId, email);

    setIsLoading(false);
    setEmail("");
    closeModal();
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button type="button" className="btn w-full" onClick={openModal}>
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          open={isOpen}
          onClose={closeModal}
          className="dialog_container"
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog_content">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3 border border-gray-200 rounded-10">
                      <Image
                        src="/assets/icons/logo.svg"
                        alt="Logo"
                        width={30}
                        height={30}
                      />
                    </div>

                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="Close Modal"
                      width={25}
                      height={25}
                      className="cursor-pointer self-start"
                      onClick={closeModal}
                    />
                  </div>

                  <h3 className="dialog_head_text">
                    Stay updated with product pricing alerts right in your
                    inbox!
                  </h3>

                  <p className="text-sm text-gray-600 mt-3">
                    Never miss a bargain with our timely alerts!
                  </p>
                </div>

                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Adress
                  </label>

                  <div className="dialog_input_container">
                    <Image
                      src="/assets/icons/mail.svg"
                      alt="Email Logo"
                      width={20}
                      height={20}
                    />

                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="dialog_input"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <button type="submit" className="dialog_btn">
                    {isLoading ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;
