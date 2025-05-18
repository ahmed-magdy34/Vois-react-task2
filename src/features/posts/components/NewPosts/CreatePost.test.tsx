// src/features/posts/__tests__/CreatePost.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import CreatePost from "./CreatePost";
import store from "../../../../store/store";
import { createPostAPI } from "../../../../services/apiPosts";

jest.mock("../../../../services/apiPosts", () => ({
  createPostAPI: jest.fn(() =>
    Promise.resolve({
      idToken: "token123",
      email: "test@example.com",
      refreshToken: "refresh123",
    })
  ),
}));

const queryClient = new QueryClient();

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CreatePost />
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
};

describe("CreatePost Component", () => {
  test("renders the CreatePost form with all fields", () => {
    renderComponent();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("allows the user to fill the form inputs", () => {
    renderComponent();
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const contentInput = screen.getByLabelText(/content/i) as HTMLInputElement;
    const imageInput = screen.getByLabelText(/image/i) as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "My Test Post" } });
    expect(titleInput.value).toBe("My Test Post");

    fireEvent.change(contentInput, {
      target: { value: "Description of my test post" },
    });
    expect(contentInput.value).toBe("Description of my test post");

    fireEvent.change(imageInput, {
      target: { value: "http://example.com/image.jpg" },
    });
    expect(imageInput.value).toBe("http://example.com/image.jpg");
  });

  test("submits the form and triggers post creation", async () => {
    renderComponent();
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const contentInput = screen.getByLabelText(/content/i) as HTMLInputElement;
    const imageInput = screen.getByLabelText(/image/i) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(titleInput, { target: { value: "My Test Post" } });
    fireEvent.change(contentInput, {
      target: { value: "Description of my test post" },
    });
    fireEvent.change(imageInput, {
      target: { value: "http://example.com/image.jpg" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createPostAPI).toHaveBeenCalledWith(
        {
          title: "My Test Post",
          content: "Description of my test post",
          url: "http://example.com/image.jpg",
        },
        expect.anything(),
        expect.anything()
      );
    });
  });
});
