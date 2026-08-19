import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Posts } from './Posts';
import { PostService } from '../API/PostService';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../API/PostService', () => {
  return {
    PostService: {
      getPost: vi.fn(),
      getPostId: vi.fn(),
      getPostComments: vi.fn(),
    }
  };
});

const mockPosts = [
  { id: 1, title: 'React Basics', body: 'Learn the core concepts of React.' },
  { id: 2, title: 'Advanced CSS', body: 'Master flexbox and animations.' }
];

describe('Posts Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders and lists posts after loading', async () => {
    vi.mocked(PostService.getPost).mockResolvedValue({
      data: mockPosts,
      headers: {
        'x-total-count': '2'
      }
    } as any);

    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/React Basics/)).toBeInTheDocument();
      expect(screen.getByText(/Advanced CSS/)).toBeInTheDocument();
    });
  });

  it('opens modal and adds a new post', async () => {
    const user = userEvent.setup();
    vi.mocked(PostService.getPost).mockResolvedValue({
      data: mockPosts,
      headers: {
        'x-total-count': '2'
      }
    } as any);

    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>
    );

    await screen.findByText(/React Basics/);

    const createButton = screen.getByRole('button', { name: /создать пост/i });
    await user.click(createButton);

    const titleInput = screen.getByPlaceholderText('enter title');
    const descInput = screen.getByPlaceholderText('enter description');
    const sendButton = screen.getByRole('button', { name: /send/i });

    await user.type(titleInput, 'Vitest Guide');
    await user.type(descInput, 'Testing components with Vitest');
    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/Vitest Guide/)).toBeInTheDocument();
    });
  });

  it('deletes a post from the list', async () => {
    const user = userEvent.setup();
    vi.mocked(PostService.getPost).mockResolvedValue({
      data: mockPosts,
      headers: {
        'x-total-count': '2'
      }
    } as any);

    const { container } = render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>
    );

    await screen.findByText(/React Basics/);

    const deleteIcons = container.querySelectorAll('.icon-delete');
    expect(deleteIcons.length).toBe(2);

    await user.click(deleteIcons[0]);

    await waitFor(() => {
      expect(screen.queryByText(/React Basics/)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/Advanced CSS/)).toBeInTheDocument();
  });

  it('filters posts by search query', async () => {
    const user = userEvent.setup();
    vi.mocked(PostService.getPost).mockResolvedValue({
      data: mockPosts,
      headers: {
        'x-total-count': '2'
      }
    } as any);

    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>
    );

    await screen.findByText(/React Basics/);

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'CSS');

    await waitFor(() => {
      expect(screen.queryByText(/React Basics/)).not.toBeInTheDocument();
      expect(screen.getByText(/Advanced CSS/)).toBeInTheDocument();
    });
  });
});
