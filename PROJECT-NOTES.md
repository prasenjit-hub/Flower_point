# 📓 Developer Notes

## Performance Optimization
- **Images**: All images are sourced from Unsplash with `q=80` and `auto=format`. Use `loading="lazy"` for off-screen images.
- **Rendering**: Critical components are wrapped in `React.memo()` to prevent unnecessary re-renders during cart updates.
- **Lighthouse Goals**: Aiming for 95+ in Performance and SEO.

## State Management
- **Cart**: Handled via `CartProvider` using a context-based singleton pattern.
- **Persistence**: Cart and Reviews are persisted via `localStorage`.

## SEO Logic
- **JSON-LD**: Always update the `Product` schema in `ProductDetail.tsx` when adding new attributes to the `Product` type.
