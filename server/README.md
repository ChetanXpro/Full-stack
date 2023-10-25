### Backend Local Installation

 ## There are two ways to run server


# First way is to run server with docker

- Build the container
```bash
docker build -t nodeserver .
```
- Run the container , dont forget to provide env.
```bash
docker run <ENVS>  -p 8000:8000 nodeserver
 ```

# Second way is to run server without docker


1. **Clone the Repository**: Start by cloning the TaskMate repository from GitHub:

    ```bash
    git clone https://github.com/ChetanXpro/Task-management.git
    ```

2. **Environment Variables**:

    - Create a copy of the `.env.example` file and rename it to `.env`.
    - Open the `.env` file and fill in the required environment variables. You can refer to the `.env.example` for guidance on what variables are needed.
    - There are envs to connect with mongodb , redis , aws s3 bucket , etc

3. **Install Dependencies**: Navigate to the project directory and install the required dependencies using npm or yarn:

    ```bash
    cd Task-management
    cd server
    npm install
    ```

4. **Run the Development Server**: After the dependencies are installed, start the development server:

    ```bash
    npm run dev
    ```

5. **Access TaskMate**: You can now access TaskMate client by opening a web browser and visiting the development server's URL, typically [http://localhost:8000](http://localhost:8000).

The server should be up and running,Make sure the frontend is also running and accessible as required.

You're ready to start using and customizing TaskMate on your local environment!
