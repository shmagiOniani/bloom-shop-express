# Google One Tap Troubleshooting Guide

## Common Issues and Solutions

### 1. One Tap Not Showing

**Possible Causes:**
- User is already signed in
- User has previously dismissed One Tap
- Browser doesn't support One Tap
- Google Cloud Console configuration issues
- Domain not properly configured

**Solutions:**
1. **Check if user is already signed in:**
   ```javascript
   // Clear any existing tokens
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   ```

2. **Reset One Tap state:**
   ```javascript
   // Clear Google's One Tap state
   if (window.google) {
     window.google.accounts.id.disableAutoSelect();
   }
   ```

3. **Check browser console for errors:**
   - Look for CORS errors
   - Check for Google API errors
   - Verify client ID is correct

### 2. Google Cloud Console Configuration

**Required Settings:**

1. **OAuth Consent Screen:**
   - App name: "Bloom Express"
   - User support email: Your email
   - Developer contact information: Your email
   - Scopes: `email`, `profile`

2. **OAuth 2.0 Credentials:**
   - Application type: Web application
   - Authorized JavaScript origins:
     ```
     http://localhost:8080
     http://localhost:5173
     http://localhost:3000
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3001/api/auth/google/callback
     ```

3. **One Tap Specific Settings:**
   - Enable "One Tap" in Google Cloud Console
   - Add your domain to authorized domains
   - Ensure HTTPS in production

### 3. Environment Variables

**Frontend (.env):**
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_API_URL=http://localhost:3001
```

**Backend (.env):**
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/api/auth/google/callback
```

### 4. Code Implementation Issues

**Current Implementation:**
```javascript
import { useGoogleOneTapLogin } from "@react-oauth/google";

const GoogleAuthBtns = () => {
  const [showOneTap, setShowOneTap] = useState(true);

  useGoogleOneTapLogin({
    onSuccess: handleOneTapSuccess,
    onError: handleOneTapError,
    disabled: !showOneTap,
    cancel_on_tap_outside: true,
    prompt_parent_id: "one-tap-container",
  });

  // ... rest of component
};
```

**Common Code Issues:**
1. **Missing GoogleOAuthProvider:**
   ```javascript
   // Ensure this wraps your app
   <GoogleOAuthProvider clientId="your-client-id">
     <App />
   </GoogleOAuthProvider>
   ```

2. **Incorrect client ID:**
   - Use the same client ID in both frontend and backend
   - Ensure it's the Web application client ID, not iOS/Android

3. **One Tap container issues:**
   ```javascript
   // Ensure container exists and is positioned correctly
   <div id="one-tap-container" className="fixed top-4 right-4 z-50"></div>
   ```

### 5. Testing One Tap

**Manual Testing Steps:**

1. **Clear browser data:**
   - Clear cookies and localStorage
   - Sign out of Google account
   - Refresh page

2. **Check browser console:**
   ```javascript
   // Add this to debug
   console.log('Google One Tap Status:', window.google?.accounts?.id);
   ```

3. **Test with different scenarios:**
   - First-time user
   - Returning user
   - User who previously dismissed One Tap

### 6. Production Issues

**HTTPS Requirement:**
- One Tap requires HTTPS in production
- Update Google Cloud Console with production domain
- Ensure all redirect URIs are HTTPS

**Domain Configuration:**
```javascript
// Production domains in Google Cloud Console
https://yourdomain.com
https://www.yourdomain.com
```

### 7. Debug Commands

**Add these to your component for debugging:**

```javascript
useEffect(() => {
  // Check if Google One Tap is available
  if (window.google?.accounts?.id) {
    console.log('Google One Tap is available');
  } else {
    console.log('Google One Tap is not available');
  }

  // Check current user state
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  console.log('Current auth state:', { token: !!token, user: !!user });
}, []);
```

### 8. Alternative Implementation

**If One Tap still doesn't work, try this alternative:**

```javascript
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";

const GoogleAuthBtns = () => {
  return (
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginError}
      useOneTap={true} // Enable One Tap on the button
      type="standard"
      theme="outline"
      size="large"
      text="continue_with"
      shape="rectangular"
    />
  );
};
```

### 9. Browser Compatibility

**Supported Browsers:**
- Chrome 67+
- Firefox 60+
- Safari 11+
- Edge 79+

**Mobile Support:**
- iOS Safari 11+
- Chrome Mobile 67+
- Samsung Internet 7+

### 10. Common Error Messages

**"popup_closed_by_user":**
- User dismissed the One Tap prompt
- Normal behavior, not an error

**"access_denied":**
- User denied permission
- Check OAuth consent screen configuration

**"invalid_client":**
- Incorrect client ID
- Check Google Cloud Console configuration

**"redirect_uri_mismatch":**
- Redirect URI doesn't match Google Cloud Console
- Update authorized redirect URIs

### 11. Performance Optimization

**Best Practices:**
1. Load Google One Tap only when needed
2. Disable One Tap for authenticated users
3. Use proper error handling
4. Implement proper loading states

**Example:**
```javascript
const { isAuthenticated } = useAuth();

useGoogleOneTapLogin({
  onSuccess: handleOneTapSuccess,
  onError: handleOneTapError,
  disabled: isAuthenticated, // Don't show for authenticated users
});
```

## Quick Fix Checklist

- [ ] Clear browser data and cookies
- [ ] Check Google Cloud Console configuration
- [ ] Verify client ID matches frontend and backend
- [ ] Ensure HTTPS in production
- [ ] Check browser console for errors
- [ ] Test with incognito/private browsing
- [ ] Verify domain is authorized in Google Cloud Console
- [ ] Check if user is already authenticated
- [ ] Ensure GoogleOAuthProvider wraps the app
- [ ] Test with different browsers

## Support

If issues persist:
1. Check browser console for specific error messages
2. Verify Google Cloud Console configuration
3. Test with a fresh browser session
4. Check network tab for failed requests
5. Ensure all environment variables are set correctly 