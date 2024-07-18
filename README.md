# Rapidez Riverty

## Requirements

You need to have the [Riverty Magento 2 module](https://docs.riverty.com/bnpl/platforms/magento/magento_2#setup) installed and configured within your Magento 2 installation.

## Installation

```bash
composer require rapidez/riverty
```

## Configuration

In order to let guests check out using Riverty they need to know their Date Of Birth and Gender.
For this a template has been added. You must load this in on your payment page.

```blade
@include('riverty::additional-info')
```

## Views

You can publish the views with:
```bash
php artisan vendor:publish --provider="Rapidez\Riverty\RivertyServiceProvider" --tag=views
```

## Icons

You can publish the icons with:
```bash
php artisan vendor:publish --provider="Rapidez\Riverty\RivertyServiceProvider" --tag=payment-icons
```

## License

GNU General Public License v3. Please see [License File](LICENSE) for more information.
