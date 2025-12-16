# ShopZone E-commerce Website

A modern, premium e-commerce website with Zomato-inspired styling built with pure HTML, CSS, and JavaScript.

## Features

- 🎨 **Vibrant Design**: Zomato-inspired color palette with smooth gradients
- 🛒 **Shopping Cart**: Full cart functionality with localStorage persistence
- 🔍 **Search & Filter**: Product search and category filtering
- ⏱️ **Flash Sales**: Live countdown timer for deals
- 📱 **Responsive**: Works on all devices (mobile, tablet, desktop)
- ✨ **Animations**: Smooth transitions and micro-interactions

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Deployment**: OpenShift Container Platform via Jenkins CI/CD (using nginx)

## Local Development

Simply open `index.html` in your browser:

```bash
open index.html
```

Or use a simple HTTP server:

```bash
# Python 3
python3 -m http.server 8080

# Or using npx
npx http-server -p 8080
```

Then open `http://localhost:8080` in your browser.

## Jenkins CI/CD Pipeline

The application includes a Jenkins pipeline (`Jenkinsfile`) that:

1. ✅ Checks out source code
2. ✅ Creates OpenShift BuildConfig with nginx (if not exists)
3. ✅ Starts binary build
4. ✅ Deploys application to OpenShift
5. ✅ Verifies deployment status

### Pipeline Stages

- **Checkout Source**: Pulls code from SCM
- **Create BuildConfig**: Sets up OpenShift build configuration with nginx
- **Start Binary Build**: Builds application image
- **Deploy Application**: Deploys to OpenShift cluster
- **Verify Deployment**: Confirms successful deployment

## Project Structure

```
ecom/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with Zomato-inspired design
├── script.js           # JavaScript functionality
├── Jenkinsfile         # CI/CD pipeline configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Deployment to OpenShift

1. **Prerequisites:**
   - Jenkins with OpenShift plugin installed
   - OpenShift cluster access configured
   - Git repository with the code

2. **Setup Jenkins Pipeline:**
   - Create a new Pipeline job in Jenkins
   - Point to your Git repository
   - Jenkins will automatically detect the `Jenkinsfile`

3. **Run Pipeline:**
   - Trigger the pipeline manually or via webhook
   - Monitor the build stages in Jenkins console
   - Access the deployed application via OpenShift route

## Environment Variables

- `APP_NAME`: Application name in OpenShift (default: ecom-web-app)

## License

MIT

---

**Built with ❤️ using modern web technologies**
