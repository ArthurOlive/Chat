<?php

$route = new Route;

class Route {

        private $routes = [];

        public function __construct(){
            echo 'ola';
            $this->initRoutes();
            $this->run($this->getURL());
        }

        public function initRoutes(){
            $this->routes['/'] = array('controller' => 'indexController', 'action' => 'index');
        }
        
        protected function run($url){
            if (array_key_exists($url, $this->routes)){
                $class = "./php/" . $this->routes[$url]['controller'];
                $controller = new $class;
                $action = $this->routes[$url]['action'];
                $controller->$action();
            }
        }

        public function getURL(){
            return parse_url($_SERVER('REQUEST_URI'), PHP_URL_PATH);
        }
}

?>